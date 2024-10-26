import Footer from "../components/public_page/Footer";
import Header from "../components/public_page/Header";
import Explore from "../pages/Explore/Explore";

function PublicLayout() {
  return (
    <div>
      <Header />
      <Explore />
      <Footer />
    </div>
  );
}

export default PublicLayout;
