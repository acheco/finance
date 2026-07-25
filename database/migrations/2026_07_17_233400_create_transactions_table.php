<?php

use App\Models\Account;
use App\Models\Category;
use App\Models\Transfer;
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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Account::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Category::class)->nullable()->constrained()->nullOnDelete();
            $table->foreignIdFor(Transfer::class)->nullable()->constrained()->onDelete('cascade');
            $table->string('recipient')->nullable();
            $table->decimal('amount', 15, 2);
            $table->string('type');
            $table->string('description')->nullable();
            $table->date('date');
            $table->timestamps();

            $table->index(['account_id', 'category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
