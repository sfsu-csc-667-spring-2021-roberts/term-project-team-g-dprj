let players = 5;
const row1 = document.querySelector('#row-1');
const row2 = document.querySelector('#row-2');

const div = document.createElement('div');
div.className = 'col-md-6 d-flex justify-content-center';
div.innerHTML = `<<div class="col-md-4">
<div class="row d-flex justify-content-center" style="margin-left:-55%">
    <div class="col-sm-1">
        <div class="card text-white bg-dark playing-card">
            <div class="card-body"></div>
        </div>
    </div>
    <div class="col-sm-1">
        <div class="card text-white bg-dark playing-card">
            <div class="card-body"></div>
        </div>
    </div>
    <div class="col-sm-1">
        <div class="card text-white bg-dark playing-card">
            <div class="card-body"></div>
        </div>
    </div>
    <div class="col-sm-1">
        <div class="card text-white bg-dark playing-card">
            <div class="card-body"></div>
        </div>
    </div>
    <div class="col-sm-1">
        <div class="card text-white bg-dark playing-card">
            <div class="card-body"></div>
        </div>
    </div>
</div>
</div>`;

const divvertical = document.createElement('div');
divvertical.className = 'col-md-3 d-flex justify-content-center';
divvertical.setAttribute('style', 'padding-top:5%');
divvertical.innerHTML = `<div class="col-card">
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
</div>`;

const divvertical2 = document.createElement('div');
divvertical2.className = 'col-md-3 d-flex justify-content-center';
divvertical2.setAttribute('style', 'padding-top:5%');
divvertical2.innerHTML = `<div class="col-card">
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
<div class="row-sm-1 vertical-card">
    <div class="card text-white bg-dark playing-card-v2">
        <div class="card-body"></div>
    </div>
</div>
</div>`;

switch (players) {
  case 3:
    row1.appendChild(div);
    break;
  case 4:
    row1.appendChild(div);
    row2.append(divvertical);
    break;
  case 5:
    row1.appendChild(div);
    row2.prepend(divvertical);
    row2.append(divvertical2);
    break;
  default:
    alert('No changes');
}
