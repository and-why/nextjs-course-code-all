import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

function HomePage(props) {
  const data = props.events;
  // console.log(data);
  const featuredEvents = getFeaturedEvents(data);

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

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
