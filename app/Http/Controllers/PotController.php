<?php

namespace App\Http\Controllers;

use App\Enums\Colors;
use App\Http\Requests\StorePotRequest;
use App\Http\Requests\UpdatePotRequest;
use App\Http\Resources\PotResource;
use App\Models\Pot;
use Auth;
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
        $pots = Auth::user()->pots()->get();

        return PotResource::collection($pots)->resolve();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePotRequest $request)
    {
        Gate::authorize('create', Pot::class);

        $request->user()->pots()->create($request->validated());

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

        $pots = Auth::user()->pots()->get();

        return Inertia::render('pots/index', [
            'pot' => $pot,
            'pots' => $this->getPotsResource(),
            'themes' => collect(Colors::list()),
            'mode' => 'edit',
            'openModal' => true,
        ]);
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pot $pot)
    {

        Gate::authorize('delete', $pot);

        $pot->delete();

        return redirect()->route('pots.index')->with('success', 'Pot deleted successfully');
    }
}
