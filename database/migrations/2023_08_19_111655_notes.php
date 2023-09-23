<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->timestamps();
            $table->integer('id_user');
            $table->text('path')->nullable();
            $table->boolean('done');
        });
    }

    public function down()
    {
        Schema::dropIfExists('notes');
    }
};
