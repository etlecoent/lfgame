import logo from  "./../../styles/logo.png";
import './Loading.scss';

const Loading = (props) => {

  return (

    <section className="page">
      <div id="loading">
        <img className="logo" alt= "logo" src={logo}/>     
      </div>
    </section>

  )
}

export default Loading;