using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class StudentController : ApiController
    {

        public IList<StudentModel> data { get; set; }

        public StudentController()
        {
            data = new List<StudentModel> { new StudentModel{ Name = "Arshad",Department="Math",Subject="Nothing"},
            new StudentModel{ Name = "Aasif",Department="Math",Subject="Nothing"},
            new StudentModel{ Name = "Shoyeb",Department="Math",Subject="Nothing"}};
        }
        // GET: api/Values
        public IEnumerable<dynamic> Get(string s, int p)
        {
            if (s != "" && p != 1)
                return data.Where(st => st.Name.Contains(s)).OrderBy(st => st.Name).Take(2).Skip(p * 2);
            else
                return data;
        }

        // POST: api/Values
        public IList<StudentModel> Post(StudentModel model)
        {
            data.Add(model);
            return data;
        }

        // PUT: api/Values/5
        public IHttpActionResult Put(StudentModel model)
        {
            var temp = data.FirstOrDefault(x => x.Name == model.Name);
            if (temp == null)
            {
                return NotFound();
            }
            else
            {
                temp.Name = model.Name;
                temp.Department = model.Department;
                temp.Subject = model.Subject;
                return Ok();
            }
        }

        // DELETE: api/Values/5
        public void Delete(int id)
        {
        }
    }
}
