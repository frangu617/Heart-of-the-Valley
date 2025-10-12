import { Girl, girls } from "../data/characters";
import { PlayerStats } from "../data/characters";
import { Interaction, interactionMenu } from "../data/interactions.ts";

interface Props {
  location: string;
  player: PlayerStats;
  setPlayer: (stats: PlayerStats) => void;
  spendTime: (amount: number) => void;
}

export default function CharacterOverlay({
  location,
  player,
  setPlayer,
  spendTime,
}: Props) {
  const presentGirls = girls.filter((g) => g.location === location);

  const interact = (girl: Girl, action: Interaction) => {
    const updatedStats = { ...player };
    Object.entries(action.statEffects || {}).forEach(([key, value]) => {
      updatedStats[key as keyof PlayerStats] += value;
    });
    setPlayer(updatedStats);
    spendTime(action.timeCost);
    alert(`${action.label} with ${girl.name}`);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {presentGirls.map((girl) => (
        <div key={girl.name}>
          <img
            src={`/images/${girl.name.toLowerCase()}.jpg`}
            alt={girl.name}
            width="100px"
          />
          <h4>{girl.name}</h4>
          {interactionMenu.map((action) => (
            <button key={action.label} onClick={() => interact(girl, action)}>
              {action.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
