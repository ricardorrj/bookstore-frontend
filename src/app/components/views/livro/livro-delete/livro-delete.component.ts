import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {
  
  id_cat: String = '';

  livro: Livro = {
      id: '',
      titulo: '',
      nomeAutor: '',
      texto: ''
  }

  constructor(
      private router: Router,
      private service: LivroService,
      private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
      this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
      this.livro.id = this.route.snapshot.paramMap.get('id')!;
      this.findById();
  }


  findById(): void{
      this.service.findById(this.livro.id!).subscribe((resposta)=>{
          this.livro = resposta;
      });
  }


  delete(): void{
      this.service.delete(this.livro.id!).subscribe((resposta) => {
              
          this.irParaLivros();
          this.service.mensagem('Livro deletado com sucesso!');
      },
      err => {
          this.irParaLivros();
          this.service.mensagem('Erro ao deletar Livro!');
      })
  }


  irParaLivros() {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}

