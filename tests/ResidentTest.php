<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ResidentTest extends TestCase
{
    public function setUp(){
        parent::setUp();

        $this->user = factory(App\User::class, "resident")->create();
    }

    public function testDashboard(){
        $this->actingAs($this->user)
            ->visit("/")
            ->see("Evaluate Faculty")
            ->see("You have no pending evaluations")
            ->dontSee("tbody");
    }
}
