import PotCard from '@/components/pot-card';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import AppLayout from '@/layouts/app-layout';
import type { Pot } from '@/types/pot';

export default function index({ pots }: { pots: Pot[] }) {
  return (
    <AppLayout>
      <Header title="Pots" classname="mb-8">
        <Button size="xl">+ Add New Pot</Button>
      </Header>

      <div className="gap grid gap-6 lg:grid-cols-2">
        {pots.map((pot) => (
          <PotCard key={pot.id} pot={pot} />
        ))}
      </div>
    </AppLayout>
  );
}
