<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = ['client_id', 'message'];
    protected $table = "messages_chat";
}
