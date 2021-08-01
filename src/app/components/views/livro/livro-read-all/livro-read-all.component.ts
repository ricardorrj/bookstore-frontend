import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  listLivros : Livro [] = [];

  displayedColumns: string[] = ['id', 'titulo', 'texto', 'acoes'];

  constructor(
      private service: LivroService, 
      private router: Router, 
      private route: ActivatedRoute
  ) { }

  id_cat: String = '';

  ngOnInit(): void {
      this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
      this.findAll();
  }


  findAll(){
    this.service.findAll(this.id_cat).subscribe(resposta => {
        //console.log(resposta);
        this.listLivros = resposta.sort();
    });
  }


  irParaCriarLivro(){
      this.router.navigate([`categorias/${this.id_cat}/livros/create`])
  }


  irParaCategorias() {
      this.router.navigate(["categorias"])
  }

}
