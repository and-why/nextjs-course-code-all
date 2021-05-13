import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const router = useRouter();
  const data = props.events;
  const events = getAllEvents(data);

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;

export async function getStaticProps() {
  const res = await fetch(
    'https://nextjs-course-6f90d-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
  );
  const data = await res.json();
  if (!data || data.length < 1) {
    return <p>Loading...</p>;
  }
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      title: data[key].title,
      description: data[key].description,
      image: data[key].image,
      location: data[key].location,
      isFeatured: data[key].isFeatured,
      date: data[key].date,
    });
  }

  return {
    props: { events },
  };
}
