interface MenuProps {
  currentLevelId: string;
  levels: {
    id: string;
    name: string;
  }[];
  onSetLevel: (id: string) => void;
}

const Menu = ({ currentLevelId, levels, onSetLevel }: MenuProps) => {
  return (
    <div>
      <h1>Menu</h1>
      <div>
        {levels.map((level) => (
          <button
            type="button"
            key={level.id}
            onClick={() => {
              onSetLevel(level.id);
            }}
          >
              {level.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            onSetLevel(currentLevelId);
          }}
        >
          Restart level
        </button>
      </div>
    </div>
  );
}

export default Menu;
