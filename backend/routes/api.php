<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Ably\Laravel\Facades\Ably;
// 1
Route::post('new-message', function (Request $request) {

    $data = [
        'user' => $request->user, 
        'message' => $request->message
    ];

    Ably::channel('public.room')->publish('.message.new', $data, '123');
    //event(new MessageEvent($request->user, $request->message));
    //return 'ok';

});