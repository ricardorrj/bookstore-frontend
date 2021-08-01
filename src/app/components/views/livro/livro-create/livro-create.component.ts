import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = '';

  livro: Livro = {
      id: '',
      titulo: '',
      nomeAutor: '',
      texto: ''
  }

  titulo = new FormControl('', [Validators.minLength(3)]);
  nomeAutor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  constructor(
      private router: Router,
      private service: LivroService,
      private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
      this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }


  create():void {
      this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      
          this.irParaLivros();
          this.service.mensagem('Livro criado com sucesso!');
      },
      err => {
          this.irParaLivros();
          this.service.mensagem('Erro ao criar novo Livro!');
      })
  }


  getMessage(){
      if(this.titulo.invalid){
        return 'O campo Titulo deve conter entre 3 e 100 caracteres';
      }

      if(this.nomeAutor.invalid){
        return 'O campo Nome do Autor deve conter entre 3 e 100 caracteres';
      }

      if(this.texto.invalid){
        return 'O campo Texto deve conter entre 10 e 2.000.000 caracteres';
      }

      return false;
  }


  irParaLivros() {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}
