<?php

namespace App\Http\Controllers;

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\Notes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Notes::where('id_user', auth()->id())->orderBy('created_at', 'desc')->get();
        return Inertia::render('Dashboard', [
            'notes' => $notes
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
    public function store(Request $request)
    {
        $notes = new Notes();
        $notes->title = $request->formTitle;
        $notes->content = $request->formContent;
        $notes->id_user = auth()->id();
        $notes->done = 0;
        $notes->save();

        return redirect()->back()->with('message' , 'success');
    }

    /**
     * Display the specified resource.
     */
    public function show($done)
    {
        $notes = Notes::where('id_user', auth()->id());
        if($done === 'done'){
            $notes->where('done', 1);
        }else if ($done === 'not done'){
            $notes->where('done', 0);
        }else{
            $notes = $notes;
        }
        
        return $notes->orderBy('created_at', 'desc')->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        Notes::where('id', $request->noteId)->update([
            'title' => $request->formTitle,
            'content' => $request->formContent,
            'done' => $request->done
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $notes = Notes::find($request->noteId);
        $notes->delete();

        //return $request->noteId;
    }
}
