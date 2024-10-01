<x-layout>

    <h1>Please verify your email throug the email we've sent you.</h1>

    <p>Didn't get the email?</p>

    <form action="{{ route('verification.send') }}" method="post">

    @csrf

    <button>Send again</button>

    </form>


</x-layout>