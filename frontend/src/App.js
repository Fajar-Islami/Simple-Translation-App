import Translator from "./pages/Translator";
import { CssBaseline, Container } from "@mui/material";
function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="xl">
        <Translator />
      </Container>
    </div>
  );
}

export default App;
