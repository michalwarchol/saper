interface MenuProps {
  levels: {
    id: string;
    name: string;
  }[];
  onSetLevel: (id: string) => void;
}

const Menu = ({ levels, onSetLevel }: MenuProps) => {
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
      </div>
    </div>
  );
}

export default Menu;
