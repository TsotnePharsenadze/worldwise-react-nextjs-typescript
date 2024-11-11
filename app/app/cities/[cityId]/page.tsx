import City from "@/components/City/City";

const CityId = ({
  params,
}: {
  params: {
    cityId: string;
  };
}) => {
  return <City id={params?.cityId} />;
};

export default CityId;
