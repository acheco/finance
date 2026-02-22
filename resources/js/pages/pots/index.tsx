import PotCard from '@/components/pot-card';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import AppLayout from '@/layouts/app-layout';
import type { Pot } from '@/types/pot';

export default function index({ pots }: { pots: Pot[] }) {
  return (
    <AppLayout>
      <div className="space-y-8">
        <Header title="Pots">
          <Button size="xl">+ Add New Pot</Button>
        </Header>

        {pots.map((pot) => (
          <PotCard key={pot.id} pot={pot} />
        ))}
      </div>
    </AppLayout>
  );
}
