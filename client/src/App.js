import "./App.css";
import UploadForm from "./component/UploadForm";
import UpdateForm from "./component/UpdateForm";
import View from "./component/View";
import DeleteForm from "./component/DeleteForm";
import ExportItem from "./component/ExportItem";

function App() {
  return (
    <div>
      <div>inventory application</div>
      <View />
      <ExportItem />
      <UploadForm />
      <UpdateForm />
      <DeleteForm />
    </div>
  );
}

export default App;
