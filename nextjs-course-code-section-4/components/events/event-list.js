import EventItem from './event-item';
import styles from './event-list.module.css';

export default function EventList(props) {
  const { items } = props;

  return (
    <ul className={styles.list}>
      {items.map((event) => {
        return (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            location={event.location}
            image={event.image}
            date={event.date}
          />
        );
      })}
    </ul>
  );
}
