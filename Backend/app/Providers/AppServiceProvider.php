<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use App\Models\Sanctum\PersonalAccessToken;
use Illuminate\Support\ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;

use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);


        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verify Email Address')
                ->view('emails.email-verification-message', ['url' => $url]);
        });
    


    }
}
