import classNames from "classnames";
import BingoCard from "./BingoCard";
import { useGetBingoQuery, useUpdateBingoMutation } from "../../api/apiSlice";
import { BingoType } from "../../reducers/bingo";

const BingoPage = () => {
  const { data: bingo = [] } = useGetBingoQuery("Bingo");
  const [updateBingo] = useUpdateBingoMutation();

  return (
    <div className="bingo-cards-wrapper">
      {bingo.length === 0 && (
        <h5 className="text-center mt-5">Bingo no founded</h5>
      )}
      {bingo.length > 0 &&
        bingo.map((item: BingoType) => {
          const bingoClass = classNames("flip-card-inner", {
            "is-flipped": item.status === true,
          });

          return BingoCard({
            id: parseInt(item.id),
            side: item.task,
            color: item.color,
            status: item.status,
            bingoClass: bingoClass,
            updateBingo,
          });
        })}
    </div>
  );
};

export default BingoPage;
