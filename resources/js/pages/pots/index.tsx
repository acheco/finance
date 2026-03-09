import { Head, Link, router } from '@inertiajs/react';
import PotController from '@/actions/App/Http/Controllers/PotController';
import EmptyBlock from '@/components/empty-block';
import FormModal from '@/components/form-modal';
import PotCard from '@/components/pots/pot-card';
import PotForm from '@/components/pots/pot-form';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import AppLayout from '@/layouts/app-layout';
import type { PotPageProps } from '@/types/pot';

export default function index({
  pot,
  pots,
  mode,
  themes,
  openModal,
}: PotPageProps) {
  const handleClose = () => {
    router.visit(PotController.index().url, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  return (
    <AppLayout>
      <Head title="Pots" />
      <Header title="Pots">
        <Button size="xl" asChild>
          <Link href={PotController.create().url}>+ Add New</Link>
        </Button>
      </Header>

      {pots.length === 0 ? (
        <EmptyBlock
          title="No Pots"
          description=" Create a pot to set savings targets. These can help keep you on
              track as you save for special purchases."
          iconName="TipJarIcon"
        >
          <Link href={PotController.create().url}>+ Add New</Link>
        </EmptyBlock>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {pots.map((pot) => (
            <PotCard key={pot.id} pot={pot} />
          ))}
        </div>
      )}

      <FormModal open={openModal} handleClose={handleClose}>
        <PotForm mode={mode} themes={themes} pot={pot} />
      </FormModal>
    </AppLayout>
  );
}
