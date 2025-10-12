import { PlayerStats } from "../data/characters";

interface Props {
  stats: PlayerStats;
  hour: number;
}

export default function StatsPanel({ stats, hour }: Props) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <p>🕒 Time: {hour}:00</p>
      <p>💰 Money: ${stats.money}</p>
      <p>⚡ Energy: {stats.energy}</p>
      <p>😊 Mood: {stats.mood}</p>
      <p>🍔 Hunger: {stats.hunger}</p>
      <p>🏋️ Fitness: {stats.fitness}</p>
      <p>🧠 Intelligence: {stats.intelligence}</p>
      <p>💅 Style: {stats.style}</p>
    </div>
  );
}
