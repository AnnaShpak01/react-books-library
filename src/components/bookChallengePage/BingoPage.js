
import {useMemo} from 'react';
import classNames from 'classnames';
import BingoCard from "./BingoCard";
import { useGetBingoQuery, useUpdateBingoMutation } from '../../api/apiSlice';

const BingoPage = () => {
    const {
        data: bingo = [],
      } = useGetBingoQuery();
    const [updateBingo] = useUpdateBingoMutation();
    const bingoCards = useMemo(() => {
          return bingo.slice();
    }, [bingo]);

    const renderBingo = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Bingo no founded</h5>
        }

        return arr.map((item) => {
            const bingoClass = classNames('flip-card-inner', {
                'is-flipped': item.status === true
            });
            
            return(BingoCard(item.id, item.task, item.color, item.status, bingoClass, updateBingo))
        })
    }

    const elements = renderBingo(bingoCards);

    return (
            <div className='bingo-cards-wrapper'>
                {elements}
            </div>
    )
}

export default BingoPage;