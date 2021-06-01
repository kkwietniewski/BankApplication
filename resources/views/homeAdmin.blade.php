@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Strona administracyjna</div>

                    <div class="card-body">
                    
                        Strona użytkownika z rolą: admin<br>

                        Rola: {{Auth::user()->role}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection