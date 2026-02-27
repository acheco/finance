<?php

namespace App\Http\Controllers;

use App\Enums\Colors;
use App\Http\Requests\StorePotRequest;
use App\Http\Requests\UpdatePotRequest;
use App\Http\Resources\PotResource;
use App\Models\Pot;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pots/index', [
            'pots' => $this->getPotsResource(),
            'openModal' => false,
        ]);
    }

    private function getPotsResource()
    {
        $pots = Auth::user()->pots()->orderBy('created_at', 'desc')->get();

        return PotResource::collection($pots)->resolve();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePotRequest $request)
    {
        Gate::authorize('create', Pot::class);

        Auth::user()->pots()->create($request->validated());

        return redirect()->route('pots.index')->with('success', 'Pot created successfully');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Pot::class);

        return Inertia::render('pots/index', [
            'pots' => $this->getPotsResource(),
            'themes' => collect(Colors::list()),
            'mode' => 'create',
            'openModal' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pot $pot)
    {
        Gate::authorize('update', $pot);

        return Inertia::render('pots/index', [
            'pot' => $pot,
            'pots' => $this->getPotsResource(),
            'themes' => collect(Colors::list()),
            'mode' => 'edit',
            'openModal' => true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pot $pot)
    {

        Gate::authorize('delete', $pot);

        $pot->delete();

        return redirect()->route('pots.index')->with('success', 'Pot deleted successfully');
    }

    /**
     * Add money to the specified resource in storage.
     */
    public function addMoney(Request $request, Pot $pot)
    {
        Gate::authorize('update', $pot);

        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.1|max:'.$pot->target_amount,
        ]);

        $pot->increment('total_amount', $validated['amount']);

        return redirect()->route('pots.index')->with('success', 'Money added successfully');

    }

    /**
     * Withdraw money from the specified resource in storage.
     */
    public function withdrawMoney(Request $request, Pot $pot)
    {
        Gate::authorize('update', $pot);

        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.1|max:'.$pot->total_amount,
        ]);

        $pot->decrement('total_amount', $validated['amount']);

        return redirect()->route('pots.index')->with('success', 'Money withdrawn successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePotRequest $request, Pot $pot)
    {
        Gate::authorize('update', $pot);

        $validated = $request->validated();

        $pot->update($validated);

        return redirect()->route('pots.index')->with('success', 'Pot updated successfully');

    }
}
