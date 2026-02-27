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
        Schema::create('pots', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->string('theme', 7);
            $table->string('name');
            $table->decimal('target_amount', 12, 2)->default('0.00');
            $table->decimal('total_amount', 12, 2)->default('0.00');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pots');
    }
};
