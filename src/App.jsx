import Statistics from "./components/Statistics";
import TransactionTable from "./components/TransactionTable";

function App() {
  return (
    <>
      <header className="flex items-center justify-center py-5 border-b border-slate-100 shadow">
        <h1 className="text-3xl uppercase tracking-widest font-semibold">
          DASHBOARD
        </h1>
      </header>

      <TransactionTable />
      {/* <Statistics /> */}
    </>
  );
}

export default App;
