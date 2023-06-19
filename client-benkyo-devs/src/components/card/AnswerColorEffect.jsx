const AnswerColorEffect = ({ opcion, respuesta, evaluated, setEvaluated, timeoutDuration = 2000 }) => {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setEvaluated(true);
      }, timeoutDuration);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [setEvaluated, timeoutDuration]);
  
    return (
      <div>
        <button
          onClick={() => setEvaluated(true)}
          style={{ backgroundColor: evaluated ? (opcion === respuesta ? "green" : "red") : "white" }}
        >
          {opcion}
        </button>
        {evaluated && <span>{respuesta}</span>}
      </div>
    );
  };

  export default AnswerColorEffect