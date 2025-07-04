function Cursor({positionX,positionY}) {
  return (
     <div
        className="bg-linear-to-r from-purple-600 to-cyan-400"
          style={{
            position: "absolute",
            top: positionY,
            left: positionX,
            transform: "translate(-50%, -50%)",
            height: "18px",
            width: "18px",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1000,
            display:"grid",
            placeItems:"center"
          }}
        >
        </div>
  )
}

export default Cursor