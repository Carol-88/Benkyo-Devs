import CardEval from "./CardEval";
//Función de animación que se produce despues del cambio de colores
const FlipCard = ({ data }) => {
    const [flip, setFlip] = useState(false);
    const { reverso } = data;
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setFlip(true);
      }, 2000);
  
      return () => {
        clearTimeout(timer);
      };
    }, []);
  
    return (
      <div
        className={`card ${flip ? 'card-flipped' : ''}`}
        onClick={() => {
          setFlip(!flip);
        }}
      >
        {flip ? (
          // Back content card
          <div>
            <p>{reverso}</p>
          </div>
        ) : (
          // Front content card
          <CardEval data={data} />
        )}
      </div>
    );
  };

  export default FlipCard;