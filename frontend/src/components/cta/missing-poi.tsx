import Link from "next/link";
import Card from "../elements/card";
import { Title } from "../elements/title";

export default async function MissingPoi() {
  return (
    <Link href={`/docs/missing-poi`}>
      <Card>
        <Title
          size="h3"
          title="Mist er een bedrijf?"
          subTitle="Lees hier hoe je OpenStreetMap kan aanvullen."
        />
      </Card>
    </Link>
  );
}
