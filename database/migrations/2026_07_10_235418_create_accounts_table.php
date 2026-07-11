<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->string('name')->comment('Account name');
            $table->string('type')->default('cash')->comment('cash, bank, credit_card, etc.');
            $table->decimal('balance', 15, 2)->default(0.00);
            $table->string('color', 7)->default('#000000')->nullable()->comment('Hex color code');
            $table->string('icon')->default('WalletIcon')->nullable()->comment('Icon name from Phosphor Icons');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('user_id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
