import AlphabetChallenge from "./AlphabetChallenge";
import BingoPage from "./BingoPage";
import "./booksChallengePage.scss";

const BookChallengePage = () => {
    return(
        <div className="site-wrapper books-challenge-page">
			<section className="tabs-wrapper">
				<div className="tabs-container">
					<div className="tabs-block">
						<div className="tabs bordered">
							<input type="radio" name="tabs" id="tab1" defaultChecked="checked" />
							<label htmlFor="tab1" className="first-label"> Bingo Challenge</label>
							<div className="tab">
                                {<BingoPage />}
							</div>
							<input type="radio" name="tabs" id="tab2" />
							<label htmlFor="tab2" className="last-label"> Alphabet Challenge</label>
							<div className="tab">
                                {<AlphabetChallenge />}
							</div>
						</div>
					</div>
				</div>
			</section>
        </div>
    );
}

export default BookChallengePage;