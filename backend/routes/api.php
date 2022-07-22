<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Ably\Laravel\Facades\Ably;
use App\Chat;
// 1
Route::post('new-message', function (Request $request) {

    $data = [
        'user' => $request->user, 
        'message' => $request->message
    ];

    Ably::channel('public.room')->publish('.message.new', $data, '123');
    if(Chat::create(['client_id' => 1,'message' => $request->message])){
        return response()->json(['message' => 'Message sent!', 'code' => 200]);
    }
    //obs: real chat client_id foreign key with users table or another approach comes dinamically
});