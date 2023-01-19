const BingoCard = (id, side, color, status, bingoClass, updateBingo ) => {

    const onClickCard = (e) => {
      updateBingo({task: side, color, status: !status, id})
    }

    return(
        <div className='bingo-card' key={id} >
          <div className="flip-card" onClick={onClickCard}>
              <div className={bingoClass}>
                <div className="flip-card-front">
                  {side}
                </div>
                <div className="flip-card-back" style={{'backgroundColor' : color}}>
                  {side}
                </div>
              </div>
            </div>
        </div>
    )
}

export default BingoCard;