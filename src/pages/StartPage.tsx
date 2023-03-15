import Button from "../components/UIElements/Button";
import classes from "./StartPage.module.css";

function StartPage() {
  return (
    <main className={classes.startpage}>
      <h1>MEMORY</h1>
      <h2>Spielregeln:</h2>
      <p>
        Die Regeln sind ganz einfach. Decke so schnell wie möglich, alle Memory Paare auf.
        Wenn dir das große Feld zu schwer ist, kannst du auch mit einem Klick auf den
        Button "KLEINES FELD", das kleine Feld spielen. Solltest du auf dem Handy spielen,
        spielst du automatisch das kleine Feld.
      </p>
      <div className={classes.actions_container}>
        <Button to="/memory">STARTE SPIEL</Button>
        <Button to="/score">RANGLISTE</Button>
      </div>
    </main>
  );
}

export default StartPage;
