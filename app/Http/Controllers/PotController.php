<?php

namespace App\Http\Controllers;

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
        $pots = Auth::user()->pots()->get();

        return Inertia::render('pots/index', [
            'pots' => PotResource::collection($pots)->resolve(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePotRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pot $pot)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pot $pot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePotRequest $request, Pot $pot)
    {
        //
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
