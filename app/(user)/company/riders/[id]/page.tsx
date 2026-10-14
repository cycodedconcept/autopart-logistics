import RiderProfile from "@/components/molecules/company/riders/riderProfile";

export default async function RiderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RiderProfile id={id} />;
}
