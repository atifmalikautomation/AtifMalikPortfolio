import { Card, PageHeader } from "../ui";
import { ComingGoing, LiveFeed, LiveStatCards, LiveTable } from "../LiveBoard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Live Visitors · Admin" };

export default function LivePage() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <PageHeader title="Live Visitors" sub="Who is on the website right now — updates automatically" />
      <LiveStatCards />
      <ComingGoing />
      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_360px] gap-5 items-start">
        <LiveTable />
        <Card title="Live activity" bodyClass="max-h-[560px] overflow-y-auto">
          <LiveFeed limit={40} />
        </Card>
      </div>
    </div>
  );
}
