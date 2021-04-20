/* eslint-disable*/
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
          </section>
          <section className="feature1">
            <div>
                <img src={ ClipBoard } />
            </div>
            <div className="textContent">
                <h2>Have a visual understanding of your expenses</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
            </div>
          </section>
          <section className="feature2">
            <div className="textContent">
                <h2>Keep track of all your expenses</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
            </div>
            <div>
                <img src={icon} />
            </div>
          </section>
          <section className="feature3">
            <div>
                <img src={Chart} />
            </div>
            <div className="textContent">
                <h2>Have a visual understanding of your expenses</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
            </div>
          </section>
        </div>
    );
}