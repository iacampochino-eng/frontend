import EstanciaVideoViewer from "@/components/EstanciaInfoCard/EstanciaInfoCard";
import MainLayout from "@/components/Layout/MainLayout";

const ReseumenPage = () => {
  return (
    <div>
      <MainLayout>
        <div className="w-2/4 mx-auto pt-20">
          <EstanciaVideoViewer />
        </div>
      </MainLayout>
    </div>
  );
};

export default ReseumenPage;
