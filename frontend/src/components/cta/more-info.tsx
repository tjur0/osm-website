import Link from "next/link";
import Card from "../elements/card";
import { Title } from "../elements/title";

export default async function MoreInfo() {
  return (
    <Link href={`/docs`}>
      <Card>
        <Title
          size="h3"
          title="Meer informatie"
          subTitle="Lees hier veelgestelde vragen over OpenStreetMap en de OSM community."
        />
      </Card>
    </Link>
  );
}
