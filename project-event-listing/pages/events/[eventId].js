import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const router = useRouter();
  const data = props.events;
  const eventId = router.query.eventId;
  const event = getEventById(eventId, data);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;

async function getData() {
  const res = await fetch(
    'https://nextjs-course-6f90d-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
  );
  const data = await res.json();
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
  return events;
}

export async function getStaticProps() {
  const data = await getData();
  return {
    props: {
      events: data,
    },
  };
}
export async function getStaticPaths() {
  const data = await getData();
  console.log(data);
  const ids = data.map((event) => event.id);
  const pathsWithParams = ids.map((id) => ({ params: { eventId: id } }));
  return {
    paths: pathsWithParams,
    fallback: false, // See the "fallback" section below
  };
}
