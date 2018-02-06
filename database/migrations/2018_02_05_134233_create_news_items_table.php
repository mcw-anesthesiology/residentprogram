<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_items', function (Blueprint $table) {
            $table->increments('id');
			$table->string('heading')->nullable();
			$table->string('body');
			$table->string('audience')->nullable();
            $table->timestamps();
        });

		Schema::create('user_news_items', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id');
			$table->integer('news_item_id');
			$table->dateTime('dismissed_at')->nullable();
			$table->dateTime('temporarily_dismiss_until')->nullable();
			$table->timestamps();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news_items');
		Schema::dropIfExists('user_news_items');
    }
}
