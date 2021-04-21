import React from "react";
import PropTypes from "prop-types";
import { GLogin } from "./login";
import ClipBoard from "../styles/images/ClipBoard.png";
import icon from "../styles/images/icon.png";
import Chart from "../styles/images/Chart.png";

export function LandingPage({ setLoginStatus })
{
    return (
        <div className="landingPage">
          <section className="login wrap">
            <GLogin setLoginStatus={setLoginStatus} />
            <div className="pointer">
                <p>About App</p>
                <div className="arrow" />
            </div>
          </section>
          <section className="feature1">
            <div>
                <img src={ ClipBoard } alt="ClipBoard"/>
            </div>
            <div className="textContent">
                <h2>Manage your expenses in one place</h2>
                <p>Easily add, remove or update a log your income or expense. Access all your added incomes and expenses with details, 
                   including the amount, date, where you spent or got the money from, and a description.</p>
            </div>
          </section>
          <section className="feature2">
            <div className="textContent">
                <h2>Keep track of all your spendings</h2>
                <p>Our application does all the calculations for you. You can access your total balance, income, and expenses. 
                   You can also set a budget for a week, month, or year, and the app will let you know if you go over budget.</p>
            </div>
            <div>
                <img src={icon} alt="calculations"/>
            </div>
          </section>
          <section className="feature3">
            <div>
                <img src={Chart} alt="Chart"/>
            </div>
            <div className="textContent">
                <h2>Have a visual understanding of your expenses</h2>
                <p>To get a quick overlay of your expense, look at the provided charts which shows you your weekly, monthly, 
                   or annual incomes and expenses side-by-side. Or take a look at the pie chart which displays all your spendings based on categories.</p>
            </div>
          </section>
        </div>
    );
}

LandingPage.propTypes = {
  setLoginStatus: PropTypes.func,
};

LandingPage.defaultProps = {
  setLoginStatus: PropTypes.func,
};

export default LandingPage;