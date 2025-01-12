import GameCard from "./components/game-card";

function Dashboard() {
  return (
    <section className="flex justify-between gap-y-4 gap-4 items-center flex-wrap">
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
      <GameCard />
    </section>
  );
}
export default Dashboard;
