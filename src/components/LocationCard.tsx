import { Location } from "../data/locations";

interface Props {
  location: Location;
  onMove: (name: string) => void;
}

export default function LocationCard({ location, onMove }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
      <img src={`/images/${location.image}`} alt={location.name} width="100%" />
      <h3>{location.name}</h3>
      <button onClick={() => onMove(location.name)}>Go</button>
    </div>
  );
}
